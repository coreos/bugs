function populateList(labels, div) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "https://api.github.com/repos/coreos/bugs/issues?sort=updated&direction=asc&labels=" + labels);
	xmlHttp.addEventListener("load", function() {
		var issues = JSON.parse(xmlHttp.responseText);
		var list = div.getElementsByTagName("ol")[0];

		issues.forEach(function(issue) {
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
	populateList("team/os,priority/P0", document.getElementById("os-p0"));
	populateList("team/os,priority/P1", document.getElementById("os-p1"));
	populateList("team/os,priority/P2", document.getElementById("os-p2"));
	populateList("team/os,priority/Pmaybe", document.getElementById("os-pmaybe"));
	populateList("team/os,kind/question", document.getElementById("os-questions"));
});
