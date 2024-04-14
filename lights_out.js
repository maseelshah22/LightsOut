$(document).ready(function () {
	$("#start_button").on("click", function (e) {
		$(".gameOver").html("");

		const boardSize = $("#boardSize").val();

		$.ajax({
			url: "setup.php",
			type: "GET",
			data: { board_size: boardSize },
			dataType: "json",
			success: function (data) {
				console.log("data", data);
				buildBoard(data, boardSize);
			},
		});
		e.preventDefault(); //so page wont refresh
	});

	function buildBoard(litTiles, dimension) {
		let board = $("<table></table>").addClass("board");
		for (let i = 0; i < dimension; i++) {
			let row = $("<tr></tr>").addClass("boardRow");
			for (let j = 0; j < dimension; j++) {
				let cID = "c" + i + j; //makes cell id so we can change tile's color
				console.log("cell ID:", cID);
				let cell = $("<td></td>")
					.addClass("tile")
					.attr("id", cID)
					.data("row", i)
					.data("col", j);

				let isPreLit = false;
				let findLit = litTiles.filter((pos) => pos.row == i && pos.col == j); //checks if the cell is lit

				if (findLit.length > 0) {
					isPreLit = true;
				}

				//console.log("isLit? ", isPreLit);

				if (isPreLit) {
					cell.addClass("brightTiles");
				} else {
					cell.addClass("darkT");
				}
				row.append(cell);
			}
			board.append(row);
		}
		$(".board").html(board);
		$(".tile").on("click", function (e) {
			let row = $(e.target).data("row");
			let col = $(e.target).data("col");
			flipLight(row, col);
		});
	}

	function flipLight(row, col) {
		//console.log("Clicked cell: ", row, col);

		let clickId = "#c" + row + col;

		if ($(clickId).hasClass("brightTiles")) {
			$(clickId).removeClass("brightTiles");
			$(clickId).addClass("darkT");
		} else {
			$(clickId).removeClass("darkT");
			$(clickId).addClass("brightTiles");
		}

		let upRow = row - 1;
		let downRow = row + 1;

		let leftCol = col - 1;
		let rightCol = col + 1;

		clickId = "#c" + upRow + col;

		if ($(clickId).hasClass("brightTiles")) {
			$(clickId).removeClass("brightTiles");
			$(clickId).addClass("darkT");
		} else {
			$(clickId).removeClass("darkT");
			$(clickId).addClass("brightTiles");
		}

		clickId = "#c" + downRow + col;

		if ($(clickId).hasClass("brightTiles")) {
			$(clickId).removeClass("brightTiles");
			$(clickId).addClass("darkT");
		} else {
			$(clickId).removeClass("darkT");
			$(clickId).addClass("brightTiles");
		}

		clickId = "#c" + row + leftCol;

		if ($(clickId).hasClass("brightTiles")) {
			$(clickId).removeClass("brightTiles");
			$(clickId).addClass("darkT");
		} else {
			$(clickId).removeClass("darkT");
			$(clickId).addClass("brightTiles");
		}

		clickId = "#c" + row + rightCol;

		if ($(clickId).hasClass("brightTiles")) {
			$(clickId).removeClass("brightTiles");
			$(clickId).addClass("darkT");
		} else {
			$(clickId).removeClass("darkT");
			$(clickId).addClass("brightTiles");
		}

		isGameOver();
	}

	function isGameOver() {
		if ($(".brightTiles").length == 0) {
			$(".tile").off("click");

			$(".gameOver").html(
				"<h1>Game Over!</h1>" +
					"<h2>Enter a Board Size and Click Start to Play Again!</h2>"
			);
		}
	}
});
