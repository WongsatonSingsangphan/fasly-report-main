import { StateContext } from '@/context/page';
import React, { useContext, useEffect } from 'react';

function EnrichSiteSummaryWithFlags() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        if (!state.sitesummary || !Array.isArray(state.sitesummary)) {
          console.warn('No site summary data available or invalid format.', state.sitesummary);
          return;
        }


        const response = await fetch('http://localhost:3000/api/countries', {
          method: 'GET',
          redirect: 'follow',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const countries = await response.json();


        if (!Array.isArray(countries)) {
          throw new Error('Invalid data format: Expected an array.');
        }


        const countryMap = countries.reduce((acc, country) => {
          acc[country.alpha2Code] = country.flag_svg || 'https://example.com/default-flag.svg'; 
          return acc;
        }, {});

        const updatedSiteSummary = state.sitesummary.map((site) => ({
          ...site,
          topAttackSources: Array.isArray(site.topAttackSources)
            ? site.topAttackSources.map((source) => ({
                ...source,
                flagSvg: countryMap[source.countryCode] || 'https://example.com/default-flag.svg',
              }))
            : [],
        }));

        setState((prevState) => ({
          ...prevState,
          sitesummary2: updatedSiteSummary,
        }));
      } catch (error) {
        console.error('Error fetching country data:', error.message);
      }
    };

    fetchFlags();
  }, [state.sitesummary, setState]);

  return null;
}

export default EnrichSiteSummaryWithFlags;