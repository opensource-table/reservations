# freeSeats

> A user can search for a restaurant based on location, cuisine, or restaurant’s name and visit the restaurant’s page to get an overview of what the restaurant has to offer like photos of their dishes, their menu options, customers’ reviews, and be able to make a reservation.

## Related Projects

  - Reservation: https://github.com/freeseats/wfong-service-reservations
  - Top-Bar: https://github.com/freeseats/exzerone-search-bar
  - Menu, Related Restaurants, Side-Bar: https://github.com/freeseats/Menu-Related-SideBar
  - Restaurant Photos: https://github.com/freeseats/matthewjdiaz1-photo-service
  - Reviews: https://github.com/freeseats/slhodak-reviews-and-impressions

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [Usage](#Usage)
1. [CrudOperations](#Crud)

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Seeding Database
- Before seeding, make sure to npm install
- Log into mySQL from terminal: mySQL -u root -p
- Enter password if set up with one
- If 'reservations' database exists in mySQL: drop database reservations;
- Create database in mySQL: create database reservations;
- Select database: use reservations;
- Go to db/db.js to change your user and password on line 4
- Run script:
npm run seed
- To check 'reservations' database: select * from restaurants;

## Usage

From within the root directory:
```sh
npm install
npm run build
npm start
```
- In a broswer, go to: localhost:3020

## Crud

| Method | URL | Operation |
|------|----------|-----------|
| GET  |     '/:id/reservations'     |    Retrieves the data        |
| POST |    '/reservations'          |           |
| PUT  |      '/:id/reservations'    |           |
| DELETE|    '/:id/reservations'     |           |


## Create a new restaurant with its availability and data

### URL 
  /reservations

### Method
  `POST`

### URL Parameters:
  none

### Data Parameters:
  POST will have a JSON.stringified object containing the info for one restaurant
  
### Success Response:
  Code: 201 Created

### Error Response:
  Code: 500 INTERNAL SERVER ERROR
  Content: { 'Could not create reservation' }

### Sample Call:

  `$.ajax({
    url: "/:id/reservations",
    dataType: "json",
    type : "POST",
    success : (err, results) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          bookings: res.data.booked,
          resName: res.data.name,
          allData: res.data,
        });
      }
    }
  });`


## Receive one restaurants availability and data

### URL 
  /:id/reservations

### Method
  `GET`
### URL Parameters:
  `id=[interger]`

### Data Parameters:
  GET will have an id on its body payload
  
### Success Response:
  Code: 200 OK

### Error Response:
  Code: 404 NOT FOUND 
  Content: { 'unable to retrieve from db: ', err) }

### Sample Call:

  `$.ajax({
    url: "/:id/reservations",
    dataType: "json",
    type : "GET",
    success : (err, results) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          bookings: res.data.booked,
          resName: res.data.name,
          allData: res.data,
        });
      }
    }
  });`


## Update one restaurants availability and data

### URL 
  /:id/reservations

### Method
  `PUT`

### URL Parameters:
  `id=[interger]`

### Data Parameters:
  PUT will have an id on its body payload
    and a JSON.stringified object
  
### Success Response:
  Code: 202 ACCEPTED

### Error Response:
  Code: 500 INTERNAL SERVER ERROR 
  Content: { 'Could not update reservation' }

### Sample Call:

  `$.ajax({
    url: "/:id/reservations",
    dataType: "json",
    type : "PUT",
    success : (err, results) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          bookings: res.data.booked,
          resName: res.data.name,
          allData: res.data,
        });
      }
    }
  });`


## Delete one restaurants availability and data

### URL 
  /:id/reservations

### Method
  `DELETE`
### URL Parameters:
  `id=[interger]`

### Data Parameters:
  DELETE will have an id on its body payload
  
### Success Response:
  Code: 202 ACCEPTED

### Error Response:
  Code: 500 INTERNAL SERVER ERROR 
  Content: { 'Could not delete reservation' }

### Sample Call:

  `$.ajax({
    url: "/:id/reservations",
    dataType: "json",
    type : "DELETE",
    success : (err, results) => {
      if (err) {
        console.log(err);
      } else {
        this.setState({
          bookings: res.data.booked,
          resName: res.data.name,
          allData: res.data,
        });
      }
    }
  });`