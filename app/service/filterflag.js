import { StateContext } from '@/context/page';
import React, { useContext, useEffect } from 'react';

function FilterFlag2() {
  const { state, setState } = useContext(StateContext);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        if (!state.sites || !Array.isArray(state.sites)) {
          console.warn('No sites data available or invalid format.', state.sites);
          return;
        }

        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
        };
        const response = await fetch('http://localhost:3000/api/countries', requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const countries = await response.json();
        if (!Array.isArray(countries)) {
          throw new Error('Invalid data format: Expected an array.');
        }

        // สร้างแผนที่สำหรับข้อมูลธงและชื่อประเทศ
        const countryMap = countries.reduce((acc, country) => {
          acc[country.alpha2Code] = {
            flagSvg: country.flag_svg || null,
            name: country.name || null,
          };
          return acc;
        }, {});

        // จัดรูปแบบข้อมูลโดยเพิ่ม Top Attacks จาก state.sites
        const enrichedSitesData = state.sites.map((site) => ({
          siteName: site.site || 'Unknown Site',
          eventattackData: site.eventattackData
            ? site.eventattackData.map((event) => ({
                ...event,
                flagSvg: countryMap[event.remoteCountryCode]?.flagSvg || null,
                name: countryMap[event.remoteCountryCode]?.name || 'Unknown',
              }))
            : [],
          topAttacks: site.topAttacks || [], // ดึง Top Attacks จาก state.sites
        }));

        setState((prevState) => ({
          ...prevState,
          eventattackData2: enrichedSitesData,
        }));
      } catch (error) {
        console.error('Error fetching country data:', error.message);
      }
    };

    fetchCountries();
  }, [state.sites, setState]);

  return null;
}

export default FilterFlag2;
