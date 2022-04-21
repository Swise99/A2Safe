function validateForm() {
    var a = document.forms["Form"]["bookName"].value;
    var b = document.forms["Form"]["authorName"].value;
    var c = document.forms["Form"]["amazonLink"].value;
    if (a==''|| b=='' || c == '') {
      alert("Please fill all the book info required!");
      return false;
    }
  };
