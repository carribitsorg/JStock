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
        
    }
}