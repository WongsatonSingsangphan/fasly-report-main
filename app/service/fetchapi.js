"use client"
import { StateContext } from '@/context/page';
import React, { useContext, useEffect } from 'react'

function fetchapi() {
    const { state, setState } = useContext(StateContext);
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/weekly-data`, requestOptions)
            .then((response) => response.json())
            .then((result) =>  setState((prevData) => ({ ...prevData, PDFdata: result,from:result.from,until:result.until,
                sitenam: result.siteNames,corpoverview:result.signalData,requests_attack:result.signalData.requests_attack.summaryCount,
                requests_total:result.signalData.requests_total.summaryCount,requests_total_blocked:result.signalData.requests_total_blocked
                .summaryCount,attcksignals:result.topsumary.attacks.data,anomarysignals:result.topsumary.anomalies.data,sitesummary:result.sitesummary,
                sites:result.sites,eventattackData:result.sites.eventattackData,ListUrl: result.ListUrl

            })))
            .catch((error) => console.error(error));
    }, [ ])

  return null
}

export default fetchapi