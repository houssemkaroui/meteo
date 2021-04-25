
import React, { useReducer } from 'react';
import Card from 'react-bootstrap/Card'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { CityMeteo } from '../service/service'
import Spinner from 'react-bootstrap/Spinner'
import Swal from 'sweetalert2'
import { useGoogleMaps } from "react-hook-google-maps";

function Weather() {

  const reducer = (state, action) => {
    switch (action.type) {
      case 'setCountry':
        return {
          ...state,
          country: action.country
        }
      case 'setCity':
        return {
          ...state,
          city: action.city
        }
    }
  }



  const [state, dispatch] = useReducer(reducer, { country: '', city: '' });
  const [disable, setDisable] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    temperature: 0, humidity: 0,
    vitesseVent: 0, perssion: 0, nuages: 0, longitude: 0, latitude: 0
  })
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyART5pQtQff3k44aN001Eg6wbIjBNUy-w4",
    {
      center: { lat: data.latitude, lng: data.longitude },
      zoom: 3,

    },
  );

  const handleCountryChange = (country) => {
    dispatch({ type: 'setCountry', country });
  }
  const selectRegion = (city) => {
    dispatch({ type: 'setCity', city })
    setDisable(false)

  }

  const handelMeteo = () => {
    setLoading(true)


    var data = {

      country: state.country.slice(0, 2).toLowerCase(),
      city: state.city.toLowerCase()
    }

    CityMeteo(data)
      .then(respence => {
        setData(respence.data)
        setLoading(false)
        addMarker({ lat: respence.data.latitude, lng: respence.data.longitude });
      })
      .catch(err => {
        Swal.fire('Erreur', 'Une erreur se produit ! Essayer plus-tard', 'error')
        setLoading(false)
      })

  }



  var addMarker = (location) => {
    new google.maps.Marker({
      position: location,
      map: map,
      title: 'current location',
    });

  }



  const styles = {

    border: '1px solid #e4e4e4',
    padding: '14px 20px',
    maxWidth: '200px'
  };


  return (
    <div>
      <div style={{ display: 'flex', marginTop: 30, position: 'relative', left: 200 }}>
        <div style={{ position: 'relative', left: 200 }}>
          <CountryDropdown
            className="country"
            value={state.country}
            onChange={handleCountryChange}
            style={styles} />
        </div>
        <div style={{ position: 'relative', left: 250 }}>
          <RegionDropdown
            disableWhenEmpty={true}
            country={state.country}
            value={state.city}
            onChange={selectRegion}
            style={
              styles
            }
          />

        </div>
        <div style={{ position: 'relative', left: 300 }}>
          <Button variant="primary" style={{ maxWidth: 96, height: 54 }} disabled={disable} onClick={handelMeteo}>
            {
              loading && (
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="false"
                />)
            }Recherche</Button>
        </div>



      </div>

      <CardDeck style={{ marginRight: 5, marginLeft: 5, marginTop: 30 }}>
        <Card border="primary" >
          <Card.Body>
            <img src="https://img.icons8.com/dusk/64/fa314a/temperature-sensitive.png" alt="" />
            <Card.Title>Temperature (Kelvins) : </Card.Title>
            <Card.Text style={{ fontSize: 'x-large' }}>
              {data.temperature}
            </Card.Text>
          </Card.Body>

        </Card>
        <Card border="primary" >

          <Card.Body>
            <img src="https://img.icons8.com/carbon-copy/64/4a90e2/partly-cloudy-day--v2.png" alt="" />
            <Card.Title>Humidity (%) :</Card.Title>
            <Card.Text style={{ fontSize: 'x-large' }}>
              {data.humidity}
            </Card.Text>
          </Card.Body>

        </Card>

        <Card border="primary" >

          <Card.Body>
            <img src="https://img.icons8.com/ios/64/000000/central-heating.png" alt="" />
            <Card.Title>Vent(km/h) :</Card.Title>
            <Card.Text style={{ fontSize: 'x-large' }}>
              {data.vitesseVent}
            </Card.Text>
          </Card.Body>

        </Card>

      </CardDeck>

      <CardDeck style={{ marginRight: 5, marginLeft: 5, marginTop: 30 }}>
        <Card border="primary" >
          <Card.Body>
            <img src="https://img.icons8.com/color/64/000000/pressure.png" alt="" />
            <Card.Title>Pression(Pa) :</Card.Title>
            <Card.Text style={{ fontSize: 'x-large' }}>
              {data.perssion}
            </Card.Text>
          </Card.Body>

        </Card>
        <Card border="primary" >

          <Card.Body>
            <img src="https://img.icons8.com/ios/64/4a90e2/cloud-refresh--v2.png" alt="" />
            <Card.Title>Nuages(octa) :</Card.Title>
            <Card.Text style={{ fontSize: 'x-large' }}>
              {data.nuages}
            </Card.Text>
          </Card.Body>

        </Card>

        <Card border="primary" >

          <Card.Body>
            <div ref={ref} style={{ height: 150, maxWidth: 380 }}  >

            </div>

          </Card.Body>

        </Card>



      </CardDeck>

    </div>




  );
}

export default Weather;



