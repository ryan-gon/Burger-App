// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
      var devouredElem = $("#devoured");
      var notEatenElem = $("#notEatenBurger");
  
      var burgers = data.burgers;
      var len = burgers.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          burgers[i].id + 
          ". "+burgers[i].burger_name +
          "<button class='change-eat' data-id='" +
          burgers[i].id +
          "' data-neweat='" +
          !burgers[i].devoured +
          "'>";
  
        if (burgers[i].devoured) {
          new_elem += "Save For Later!";
        } else {
          new_elem += "Devour!";
        }
  
        new_elem += "</button>";
  
        new_elem +=
          "<button class='delete-burger' data-id='" +
          burgers[i].id +
          "'>Delete!!</button></li>";
  
        if (burgers[i].devoured) {
          devouredElem.append(new_elem);
        } else {
          notEatenElem.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-eat", function(event) {
      var id = $(this).data("id");
      var newEat = $(this).data("neweat")===true;
  
      var newEatState = {
        devoured: newEat
      };
  
      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: JSON.stringify(newEatState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed eat to", newEat);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#ca").val().trim(),
        // devoured: $("[name=eaten]:checked").val().trim()
      };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(document).on("click", ".delete-burger", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/burgers/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted burger", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  });
  