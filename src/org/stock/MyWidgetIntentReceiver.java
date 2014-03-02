package org.stock;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

public class MyWidgetIntentReceiver extends BroadcastReceiver {
	public static int clickCount = 0;
	private String msg[] = null;

	@Override
	public void onReceive(Context context, Intent intent) {
		if (intent.getAction().equals(WidgetUtils.WIDGET_UPDATE_ACTION)) {
			updateWidgetPictureAndButtonListener(context);
		}
	}

	private void updateWidgetPictureAndButtonListener(Context context) {
		RemoteViews remoteViews = new RemoteViews(context.getPackageName(),
				R.layout.widget_layout);

		WidgetData data = WidgetData.getInstance();

		String title = data.Title;
		String desc = data.Desc;

		// updating view
		remoteViews.setTextViewText(R.id.title, title);
		remoteViews.setTextViewText(R.id.desc, desc);

		// re-registering for click listener
		remoteViews.setOnClickPendingIntent(R.id.sync_button,
				MyWidgetProvider.buildButtonPendingIntent(context));

		MyWidgetProvider.pushWidgetUpdate(context.getApplicationContext(),
				remoteViews);
	}

	private String getDesc(Context context) {
		// some static jokes from xml
		msg = context.getResources().getStringArray(R.array.news_headlines);
		if (clickCount >= msg.length) {
			clickCount = 0;
		}
		return msg[clickCount];
	}

	private String getTitle() {
		return "Stock Update";
	}
}
