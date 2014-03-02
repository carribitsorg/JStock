package org.stock.plugin;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class WidgetUpdate extends CordovaPlugin {
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("update")) {
            String message = args.getString(0);
            this.update(message, callbackContext);
            return true;
        }
        return false;
    }

    private void update(String message, CallbackContext callbackContext) {
        if (message != null && message.length() > 0) {
            callbackContext.success("");
        } else {
            callbackContext.error("Expected one non-empty string argument.");
        }
    } 
}
