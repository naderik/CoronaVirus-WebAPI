$.ajax({
    type: "GET",
    url: "https://corona.lmao.ninja/countries",
    dataType: "json",
    success: function (data) {
      $.each(data, function (i, obj) {
        var div_data = "<option value=" + obj.country + ">" + obj.country + "</option>";
        $(div_data).appendTo('#Countries');
      });
    }
  });

  function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('Countries').value;
    geocoder.geocode({
      'address': address
    }, function (results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });

        $.ajax({
          type: "GET",
          url: "https://corona.lmao.ninja/countries",
          dataType: "json",
          success: function (data) {
            $.each(data, function (i, obj) {
              if (obj.country == document.getElementById('Countries').value) {
                var div_data = "<h3>" + obj.country + "</h3>" + "<p>cases: " + obj.cases +
                  " <br>todayCases: " + obj.todayCases +
                  " <br>deaths: " + obj.deaths + " <br>todayDeaths: " + obj.todayDeaths +
                  " <br>recovered: " + obj.recovered + " <br>critical: " + obj.critical +
                  " <br>recovered/confirmed: " + Math.round((((obj.recovered / obj.cases).toFixed(3)) *
                    100) * 100) / 100 +
                  "%" + " <br>deaths/confirmed: " + Math.round((((obj.deaths / obj.cases).toFixed(3)) *
                    100) * 100) / 100 +
                  "%" + "</p>";
                $(div_data).appendTo('#content');
              }
            });
          }
        });

      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }