"use client"
import React from 'react'
import { createContext, useState } from 'react'
import Fetchapi from '@/app/service/fetchapi';
import FilterFlag from '@/app/service/filterflag';
import FilterFlag2 from '@/app/service/filterflag2';


export const StateContext = createContext();
export const StateProvider = ({children}) => {
    
    const [state, setState] = useState({ PDFdata:[],eventattackData:[]    });
    console.log(state)
    return (
        <StateContext.Provider value={{state,setState}}>
            <FilterFlag2/>
            <FilterFlag/>
            <Fetchapi/>
            {children}
        </StateContext.Provider>
    )
}
