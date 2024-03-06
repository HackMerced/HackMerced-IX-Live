let lastUpdateEvents = null;

/* Load events from /api/event/list into #event-table. */
function load_events()
{
	$.getJSON("/api/event/list", function (d)
	{
		let dataStr = JSON.stringify(d.Events);

		if (lastUpdateEvents != dataStr)
		{
			lastUpdateEvents = dataStr;

			$("#event-table").empty();

			let str = "<tr><th colspan=3>Event Showings</th></tr>"
			$("#event-table").append(str);

			for (let i = d.Events.length-1; i >= 0; i--)
			{
				str =
					"<tr class='table-spacer'></tr>"+
					"<tr class='table-content'>"+
						"<td class='map'><img src='"+d.Events[i].weblink+"'/></td>"+
						"<td class='info'>"+
							"<p><b>"+d.Events[i].title+"</b> by "+d.Events[i].author+"</p>"+
							"<p>in "+d.Events[i].location+"</p>"+
							"<p>"+d.Events[i].points+" points</p>"+
						"</td>"+
						"<td class='description'>"+
							"<p>"+d.Events[i].description+"</p><br>"+
							"<p>"+
								"<span class='time'>"+d.Events[i].dDay+"</span>"+
								"<span class='time'>"+d.Events[i].dTime+"</span>"+
								"<span class='time'>"+d.Events[i].dDuration+"</span>"+
							"</p>"+
						"</td>"+
					"</tr>";

				$("#event-table").append(str);
			}
		}
	});
}
