$(document).ready(function(){
    //alert("ready");

    $('#addBook').on("click", function (e) {
        //alert("addBook");
        document.getElementById('addBook').disabled = true;
        document.getElementById("insertFormArea").style.display = "block";
        document.getElementById("insertReturnMessageBox").style.display = "none";

    });

    $('#cancelButton').on("click", function (e) {
        //alert("addBook");
        document.getElementById("insertFormArea").style.display = "none";
        document.getElementById("insertReturnMessageBox").style.display = "none";
        document.getElementById('addBook').disabled = false;

    });

    $('#frmSubmit').on("submit", function (e) {
        e.preventDefault();
        // e.stopPropagation();
        // alert(JSON.stringify(e));

        document.getElementById("insertFormArea").style.display = "none";

        var data = {
            "id":document.getElementById("formGroup_BookId").value.trim(),
            "title":document.getElementById("formGroup_BookTitle").value.trim(),
            "author":document.getElementById("formGroup_BookAuthor").value.trim(),
            "publisher":document.getElementById("formGroup_BookPublisher").value.trim(),
        }
        $.ajax({
            type: "POST",
            //url: "http://localhost:3200/book",
            url: "http://node-express-acic.cnr.tap.tanzu.vxlab.local/book",
            dataType : "text",
            data : data,
            cache: false,
            processData: true,
            async: false,
            success: function(responseData, textStatus, jqXHR) {
                //alert("success");
                //alert(JSON.stringify(responseData));

                var data = JSON.parse(responseData);

                document.getElementById("insertReturnMessageTitle").innerHTML = "Book added to your shelf!";
                document.getElementById("insertReturnMessage").innerHTML = "Title: " + JSON.stringify(data.title);

                document.getElementById("insertReturnMessageBox").style.display = "block";
                document.getElementById('addBook').disabled = false;
            },
            error: function (xhr, status, error) {
                //alert("error");
                // alert(xhr.responseText);
                
                document.getElementById("insertReturnMessageBox").style.display = "block";
                document.getElementById('addBook').disabled = false;

                document.getElementById("insertReturnMessageTitle").innerHTML = "ERROR: Couldn't add the book";
                document.getElementById("insertReturnMessage").innerHTML = JSON.stringify(xhr);
                //document.getElementById("insertReturnMessage").innerHTML = JSON.stringify(xhr.status) + ' ' + JSON.stringify(xhr.responseText).trim() + ' ' + JSON.stringify(xhr.statusText).trim();
            }

        });
    });

});
