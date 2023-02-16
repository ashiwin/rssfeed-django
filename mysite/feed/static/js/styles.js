const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll("div.items");
const firstButton = document.getElementById("first-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const lastButton = document.getElementById("last-button");
const reloadButton = document.getElementById("reload-button");

const paginationLimit = 3;
const pageCount = Math.ceil(listItems.length / paginationLimit);

let currentPage = 1;

const disableButton = (button) => {
	button.classList.add("d-none");
	button.setAttribute("disabled", true);
};

const enableButton = (button) => {
	button.classList.remove("d-none");
	button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
	if (currentPage === 1) {
		disableButton(firstButton);
		disableButton(prevButton);
	} else {
		enableButton(firstButton);
		enableButton(prevButton);
	}
	if (pageCount === currentPage || listItems.length === 0) {
		disableButton(nextButton);
		disableButton(lastButton);
	} else {
		enableButton(nextButton);
		enableButton(lastButton);
	}
};

const handleActivePageNumber = () => {
	const paginationInfo = document.querySelector("#pagination-info");
	if (paginationInfo) {
		paginationInfo.innerHTML = `Page ${currentPage} of ${pageCount}`;
	}
};

const setCurrentPage = (pageNum) => {
	currentPage = pageNum;
	handleActivePageNumber();
	handlePageButtonsStatus();
	const prevRange = (pageNum - 1) * paginationLimit;
	const currRange = pageNum * paginationLimit;
	listItems.forEach((item, index) => {
		if (index >= prevRange && index < currRange) {
			item.classList.remove("d-none");
		} else {
			item.classList.add("d-none");
		}
	});
};

firstButton.addEventListener("click", () => {
	setCurrentPage(1);
});

prevButton.addEventListener("click", () => {
	setCurrentPage(currentPage - 1);
});

nextButton.addEventListener("click", () => {
	setCurrentPage(currentPage + 1);
});

lastButton.addEventListener("click", () => {
	setCurrentPage(pageCount);
});

reloadButton.addEventListener("click", function() {
  location.reload();
});

handleActivePageNumber();
handlePageButtonsStatus();
setCurrentPage(1);
