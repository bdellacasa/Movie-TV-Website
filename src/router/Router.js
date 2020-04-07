import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Index } from "../screens/IndexScreen";
import { ListScreen } from '../screens/ListScreen';
import { ContentDetailScreen } from '../screens/ContentDetailScreen';
import { CONTENT_TYPE } from '../Constants';

/**
 * Router that manages the navigation of the application
 */

function ApplicationRouter() {
    return(
        <Router>
            <Route exact path="/" component={Index} />
            <Route path={"/list/"+CONTENT_TYPE.MOVIES} component={ListScreen} />
            <Route path={"/list/"+CONTENT_TYPE.TV} component={ListScreen} />
            <Route path={"/list/"+CONTENT_TYPE.PERSON} component={ListScreen} />
            <Route path={"/list/search/:query"} component={ListScreen} />
            <Route path={"/detail/:contentType/:id"} component={ContentDetailScreen} />
        </Router>
    )
}

export default ApplicationRouter;
