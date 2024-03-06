/* Reward confirmation. */
$(document).on("click", ".claim", function()
{
	let tr = $(this).parent().parent();
	let id = tr[0].id;
	let prize = tr.find(".reward-contents").text();
	let value = tr.find(".reward-value").text();

	if (!confirm("Are you sure you want to redeem "+prize+" for "+value+" points?"))  return;

	$.ajax(
	{
		type: "POST",
		url: "/api/reward/redeem/"+id,
		data: {"name": $("#entry-name").val()},
		success: function()
		{
			refresh();
		},
		error: function()
		{
			alert("Claim failed. Out of stock, already claimed, or insufficient points.");
		}
	});

	return false;
});
