import React, { Fragment } from 'react';
import SideBarData from './SideBarData';
import ShowItem from './ShowItem';

const Sidebar = ({ sidebar }) => {
    return (
        <Fragment>
           <div className={sidebar ? "app-sidebar" : "app-sidebar active"}> 
                <ul>
                    {
                        SideBarData.map((item,index) =>{
                            return (
                                <ShowItem  key={index}
                                path={item.path}
                                icon={item.icon}
                                page={item.page}
                                index={index}
                                />
                            )
                        })
                    }             
                </ul>
           </div>
        </Fragment>
    )
}

export default Sidebar;