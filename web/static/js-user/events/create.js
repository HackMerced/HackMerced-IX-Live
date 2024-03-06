/* Event submission. */
$("#create-form").submit(function()
{
	if (!confirm("Are you sure you want to publish this event?"))  return false;

	let lengthStr = to_HhMm($("#duration-hours").val(), $("#duration-minutes").val());

	$.ajax(
	{
		type: "POST",
		url: "/api/event/create",
		data: {
			"title": $("#title").val(),
			"author": $("#author").val(),
			"location": $("#location").val(),
			"start": $("#start").val(),
			"duration": lengthStr,
			"points": $("#pts").val(),
			"link": $("#weblink").val(),
			"description": $("#description").val(),
			"timezone": $("#timezone").val()
		},
		success: function()
		{
			location.href="/admin/events/manage";
		},
		error: function()
		{
			alert("Unexpected error occurred.");
		}
	});

	return false;
});
