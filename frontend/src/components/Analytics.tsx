'use client';

// src/components/Analytics.tsx
import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview, trackSession } from '../utils/analytics';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track session start
    trackSession();
  }, []);

  useEffect(() => {
    // Track page views
    if (pathname && GA_TRACKING_ID) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);

  // Don't load analytics in development
  if (process.env.NODE_ENV === 'development' || !GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Mixpanel (optional) */}
      {process.env.NEXT_PUBLIC_MIXPANEL_TOKEN && (
        <Script
          id="mixpanel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
              for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?
              MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);

              mixpanel.init("${process.env.NEXT_PUBLIC_MIXPANEL_TOKEN}", {
                debug: false,
                track_pageview: true,
                persistence: 'localStorage'
              });
            `,
          }}
        />
      )}

      {/* Sentry Error Tracking (optional) */}
      {process.env.NEXT_PUBLIC_SENTRY_DSN && (
        <Script
          id="sentry"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(e,n,t,r,i,o,a,c,s){for(s=e.Sentry=e.Sentry||{},s.SDK_VERSION="7.0.0",a=n.getElementsByTagName(t)[0],c=0;c<r.length;c++){var u=r[c];u.f&&s[u.f]||(s[u.f]=u.v||function(){})}var f=new XMLHttpRequest;f.open("GET",i),f.onload=function(){if(4===f.readyState&&200===f.status){var e=JSON.parse(f.responseText);for(var n in e.dsn="${process.env.NEXT_PUBLIC_SENTRY_DSN}",e.tracesSampleRate=.1,s.init(e),e)e.hasOwnProperty(n)&&(s[n]=e[n])}},f.send()}(window,document,"script",[{f:"init"},{f:"captureException"},{f:"captureMessage"}],"https://browser.sentry-cdn.com/7.0.0/bundle.min.js");
            `,
          }}
        />
      )}
    </>
  );
}
