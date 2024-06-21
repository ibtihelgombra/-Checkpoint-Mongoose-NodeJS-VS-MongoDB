require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

  const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = () => {
    const person = new Person({
      name: 'John Doe',
      age: 25,
      favoriteFoods: ['Pizza', 'Burgers']
    });
  
    person.save((err, data) => {
      if (err) return console.error(err);
      console.log('Person saved:', data);
    });
  };
  
  const createManyPeople = (arrayOfPeople) => {
    Person.create(arrayOfPeople, (err, people) => {
      if (err) return console.error(err);
      console.log('People created:', people);
    });
  };
  
  const arrayOfPeople = [
    { name: 'Alice', age: 30, favoriteFoods: ['Pasta', 'Salad'] },
    { name: 'Bob', age: 20, favoriteFoods: ['Pizza'] },
    { name: 'Charlie', age: 35, favoriteFoods: ['Steak', 'Burgers'] }
  ];
  
  createManyPeople(arrayOfPeople);
  
  const findPeopleByName = (name) => {
    Person.find({ name: name }, (err, people) => {
      if (err) return console.error(err);
      console.log('People found:', people);
    });
  };
  
  const findOneByFood = (food) => {
    Person.findOne({ favoriteFoods: food }, (err, person) => {
      if (err) return console.error(err);
      console.log('Person found:', person);
    });
  };
  
  const findPersonById = (personId) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      console.log('Person found:', person);
    });
  };
  
  const updatePersonFoods = (personId) => {
    Person.findById(personId, (err, person) => {
      if (err) return console.error(err);
      
      person.favoriteFoods.push('Hamburger');
      person.save((err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
      });
    });
  };
  const updatePersonAge = (personName) => {
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      (err, updatedPerson) => {
        if (err) return console.error(err);
        console.log('Person updated:', updatedPerson);
      }
    );
  };
 
  const removePersonById = (personId) => {
    Person.findByIdAndRemove(personId, (err, removedPerson) => {
      if (err) return console.error(err);
      console.log('Person removed:', removedPerson);
    });
  };
  const removePeopleByName = (name) => {
    Person.remove({ name: name }, (err, result) => {
      if (err) return console.error(err);
      console.log('People removed:', result);
    });
  };
 
  const queryChain = () => {
    Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age')
      .exec((err, people) => {
        if (err) return console.error(err);
        console.log('People found:', people);
      });
  };
    