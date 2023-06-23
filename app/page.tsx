"use client"
import {WidgetApiImpl} from '@matrix-widget-toolkit/api';
import {EventDirection, WidgetEventCapability} from 'matrix-widget-api';
import {STATE_EVENT_ROOM_NAME} from '@/events';
import {
    MuiThemeProvider,
    MuiWidgetApiProvider,
} from '@matrix-widget-toolkit/mui';
import Link from 'next/link'
import {WidgetApi} from '@matrix-widget-toolkit/api';
import {ReactElement} from "react";
import TestPage from "@/app/components/page"


// Initiate the widget API on startup. The Client will initiate
// the connection with `capabilities` and we need to make sure
// that the message doesn't get lost while we are initiating React.
const widgetApiPromise = WidgetApiImpl.create({
    // Tell which capabilities should be requested at startup. One
    // can also request capabilities after the application started.
    capabilities: [
        // WidgetEventCapability.forStateEvent(
        //     EventDirection.Receive,
        //     STATE_EVENT_ROOM_NAME
        // ),
    ],
});


function App({
                 widgetApiPromise,
             }: {
    widgetApiPromise: Promise<WidgetApi>;
}): ReactElement {
    return (
        <MuiThemeProvider>
            {/* Fallback suspense if no higher one is registered (used for i18n) */}
            <MuiWidgetApiProvider
                widgetApiPromise={widgetApiPromise}
                widgetRegistration={{
                    name: 'Summarizer'
                }}
            >
                <TestPage />
            </MuiWidgetApiProvider>
        </MuiThemeProvider>
    );
}


export default function Home() {
    return (
        <App widgetApiPromise={widgetApiPromise}/>
    )
}