function populateList(query, div) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "https://api.github.com/search/issues?sort=updated&order=asc&q=repo:coreos/bugs+type:issue+state:open+" + query);
	xmlHttp.addEventListener("load", function() {
		var issues = JSON.parse(xmlHttp.responseText);
		var list = div.getElementsByTagName("ol")[0];

		issues.items.forEach(function(issue) {
			var a = document.createElement('a');
			a.appendChild(document.createTextNode(issue.title));
			a.title = issue.title
			a.href = issue.html_url;

			var li = document.createElement("li");
			li.appendChild(a);

			list.appendChild(li);
		});
	});
	xmlHttp.send();
}

document.addEventListener('DOMContentLoaded', function() {
	populateList("label:team/os+label:priority/P0", document.getElementById("os-p0"));
	populateList("label:team/os+label:priority/P1", document.getElementById("os-p1"));
	populateList("label:team/os+label:priority/P2", document.getElementById("os-p2"));
	populateList("label:team/os+label:priority/Pmaybe", document.getElementById("os-pmaybe"));
	populateList("label:team/os+label:kind/question", document.getElementById("os-questions"));
	populateList("no:label", document.getElementById("os-untriaged"));
	populateList("label:team/os+-label:priority/P0+-label:priority/P1+-label:priority/P2+-label:priority/Pmaybe+-label:kind/question", document.getElementById("os-unprioritized"));
});
