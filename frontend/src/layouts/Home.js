import React from 'react'
import Banner from '../pages/home/Banner'
import Deal from '../pages/home/Deal'
import Banners from '../pages/home/Banners'
import Section1 from '../pages/home/Section1'

import Section2 from '../pages/home/Section2'
// import Request from '../pages/home/Request'  //mment lại vì chưa tạo
// import Items from '../pages/home/Items'      // Comment lại vì chưa tạo
// import Services from '../pages/home/Services' // Comment lại vì chưa tạo
// import Region from '../pages/home/Region'    // Comment lại vì chưa tạo
// import Subscribe from '../pages/home/Subscribe' // Comment lại vì chưa tạo

function Home() {
    return (
        <div className="container">
            <Banner />
         
            <Section1 />

            <Deal/>
            <Banners/>
           <Section2/>
            {/* Comment lại các components chưa tạo
            <Request />
            <Items />
            <Services />
            <Region />
            <Subscribe />
            */}
        </div>
    )
}

export default Home