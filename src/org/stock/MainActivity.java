package org.stock;
import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.webkit.WebSettings;

public class MainActivity extends DroidGap
{
    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        /* lock scaling in android 2.2 */
        /* appView.getSettings().setSupportZoom(false);
        appView.getSettings().setUseWideViewPort(false);
        WebSettings ws = appView.getSettings();
        ws.setDefaultZoom(WebSettings.ZoomDensity.MEDIUM);
        appView.getSettings().setDefaultZoom(WebSettings.ZoomDensity.MEDIUM);
        appView.setInitialScale(50);
        ws.setSupportZoom(false);
        ws.setBuiltInZoomControls(false);
        ws.setUseWideViewPort(false); */
    }
}