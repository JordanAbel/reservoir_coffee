import React from 'react';
import {
    LeftLocationContainer,
    LocationContainer,
    LocationWrapper,
    MapContainer,
    RightLocationContainer
} from "../home/homeStyles";
import {
    HoursHeader,
    HoursTable,
    LocationHeaderContainer,
    LocationInformation,
    OpenOrClosed,
    TopLocationContainer,
    BusinessClosures,
} from "./locationStyles";

import {formatDate} from "../../helperFunctions/format"


import {api} from "../../api"

function Location(props) {
    
    const [businessInfo, setBusinessInfo] = React.useState()
    const [openClosed, setOpenClosed] = React.useState("");
    const [closedReason, setClosedReason] = React.useState("");


    React.useEffect(() => {
        refreshTime();

        !businessInfo && (async () => {
            const data = await api.businessInfo()
            setBusinessInfo(data)            
        })()

    })

    const refreshTime = () => {
        setInterval(isOpen,1000);
    }

    const isOpen = () => {

        let info = businessInfo?.business_status.shift() // get first item of business_status
        
        if (info) {
            setOpenClosed(info.status || "closed")
            setClosedReason(info.closed_reason)           
        }
    }
    
    const DateFormat = (props) => {
        return <span style={{whiteSpace:'nowrap'}}>{formatDate(props.from)}
            { props.to && ` to ${formatDate(props.to)}`}
        </span>
    }

    const AdditionalClosures = (props) => {

        const dateValue = (timestamp) => Date.parse(timestamp)
        
        const upcoming_items = props.items?.filter(x => Date.now() < dateValue(x.end_date || x.start_date))
        
        return (upcoming_items.length > 0) ? <span style={{fontSize:'0.5em'}}>
                    Please note, we will be closed: <br/> {                     
                    upcoming_items?.map(item => <>{item.description}:&nbsp;&nbsp;<DateFormat from={item.start_date} to={item.end_date} /><br/></>) }                                        
                </span> : <></>

    }

    return (
        <>
            <LocationWrapper>
                <TopLocationContainer>
                    <LocationHeaderContainer>
                        Our Location
                    </LocationHeaderContainer>
                    <LocationInformation>
                        Directly across the street from TRU, overlooking the beautiful Kamloops landscape
                        is Reservoir Coffee. We can't wait to serve you the best coffee in Kamloops.
                        Come study, enjoy your lunch break, or just catch up with an old friend with us
                        here at Reservoir Coffee. 
                    </LocationInformation>
                </TopLocationContainer>
                <LocationContainer>
                    <LeftLocationContainer>
                        <MapContainer>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2528.7654930180843!2d-120.36024964866681!3d50.66861447940136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537e2c5ec2eaa95d%3A0xc9b10305ce243b14!2sReservoir%20Coffee!5e0!3m2!1sen!2sca!4v1636344072150!5m2!1sen!2sca"
                                width="600"
                                height="450"
                                style={{border: "0"}}
                                allowFullScreen="yes"
                                loading="lazy"
                                title={"map"}/>
                        </MapContainer>
                    </LeftLocationContainer>
                    <RightLocationContainer>
                        <HoursHeader>
                            Business Hours
                        </HoursHeader>
                        <HoursTable>
                            <tr>
                                <th>Sunday</th>
                                <td>Closed</td>
                            </tr>
                            <tr>
                                <th>Monday</th>
                                <td>8:00 AM - 4:00 PM</td>
                            </tr>
                            <tr>
                                <th>Tuesday</th>
                                <td>8:00 AM - 4:00 PM</td>
                            </tr>
                            <tr>
                                <th>Wednesday</th>
                                <td>8:00 AM - 4:00 PM</td>
                            </tr>
                            <tr>
                                <th>Thursday</th>
                                <td>8:00 AM - 4:00 PM</td>
                            </tr>
                            <tr>
                                <th>Friday</th>
                                <td>8:00 AM - 4:00 PM</td>
                            </tr>
                            <tr>
                                <th>Saturday</th>
                                <td>9:00 AM - 4:00 PM</td>
                            </tr>
                        </HoursTable>
                        { openClosed && <OpenOrClosed>
                            We are <span style={{color: openClosed === "open" ? "#a1ff0a" : "#ff0000"}}>{openClosed}</span> now
                            { closedReason && <div style={{fontSize:'0.5em'}}>( {closedReason} )</div> }
                        </OpenOrClosed> }
                        
                    </RightLocationContainer>
                </LocationContainer>
                { businessInfo?.business_closures && <BusinessClosures>
                    <AdditionalClosures items={businessInfo?.business_closures} />
                </BusinessClosures> }
            </LocationWrapper>
        </>
    );
}

export default Location;