require 'faker'

puts "Seeding data...."

# Clear existing data
Appointment.destroy_all
Patient.destroy_all
User.destroy_all

# Create users
u1 = User.create(username: "minchulan", email: "itsminchul@gmail.com", password: "password123", admin: false)
u2 = User.create(username: "guest", email: "email@gmail.com", password: "password123", admin: false)
admin = User.create(
  username: 'admin',
  email: 'admin@example.com',
  password: 'password',
  admin: true
)

# Create patients
p1 = Patient.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  guardian: Faker::Name.name,
  gender: ['Male', 'Female'].sample,
  dob: Faker::Date.birthday(min_age: 18, max_age: 65),
  address: Faker::Address.full_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.unique.email,
  language_preferences: ['English', 'Spanish', 'French'].sample,
  allergies: Faker::Lorem.words(number: rand(1..5)).join(', '),
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean,
  notes: Faker::Lorem.sentence
)

p2 = Patient.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  guardian: Faker::Name.name,
  gender: ['Male', 'Female'].sample,
  dob: Faker::Date.birthday(min_age: 18, max_age: 65),
  address: Faker::Address.full_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.unique.email,
  language_preferences: ['English', 'Spanish', 'French'].sample,
  allergies: Faker::Lorem.words(number: rand(1..5)).join(', '),
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean,
  notes: Faker::Lorem.sentence
)

p3 = Patient.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  guardian: Faker::Name.name,
  gender: ['Male', 'Female'].sample,
  dob: Faker::Date.birthday(min_age: 18, max_age: 65),
  address: Faker::Address.full_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.unique.email,
  language_preferences: ['English', 'Spanish', 'French'].sample,
  allergies: Faker::Lorem.words(number: rand(1..5)).join(', '),
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean,
  notes: Faker::Lorem.sentence
)

p4 = Patient.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  guardian: Faker::Name.name,
  gender: ['Male', 'Female'].sample,
  dob: Faker::Date.birthday(min_age: 18, max_age: 65),
  address: Faker::Address.full_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.unique.email,
  language_preferences: ['English', 'Spanish', 'French'].sample,
  allergies: Faker::Lorem.words(number: rand(1..5)).join(', '),
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean,
  notes: Faker::Lorem.sentence
)

p5 = Patient.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  guardian: Faker::Name.name,
  gender: ['Male', 'Female'].sample,
  dob: Faker::Date.birthday(min_age: 18, max_age: 65),
  address: Faker::Address.full_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.unique.email,
  language_preferences: ['English', 'Spanish', 'French'].sample,
  allergies: Faker::Lorem.words(number: rand(1..5)).join(', '),
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean,
  notes: Faker::Lorem.sentence
)

p6 = Patient.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  guardian: Faker::Name.name,
  gender: ['Male', 'Female'].sample,
  dob: Faker::Date.birthday(min_age: 18, max_age: 65),
  address: Faker::Address.full_address,
  phone: Faker::PhoneNumber.phone_number,
  email: Faker::Internet.unique.email,
  language_preferences: ['English', 'Spanish', 'French'].sample,
  allergies: Faker::Lorem.words(number: rand(1..5)).join(', '),
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean,
  notes: Faker::Lorem.sentence
)

# Create appointments through associated user and patient
u1.appointments.create(
  patient: p1,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  category: ['immunization', 'mtm', 'msc'].sample,
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
  date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
)

u2.appointments.create(
  patient: p2,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  category: ['immunization', 'mtm', 'msc'].sample,
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
  date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
)

admin.appointments.create(
  patient: p3,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  category: ['immunization', 'mtm', 'msc'].sample,
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
  date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
)

admin.appointments.create(
  patient: p4,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  category: ['immunization', 'mtm', 'msc'].sample,
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
  date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
)

admin.appointments.create(
  patient: p5,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  category: ['immunization', 'mtm', 'msc'].sample,
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
  date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
)

admin.appointments.create(
  patient: p6,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  category: ['immunization', 'mtm', 'msc'].sample,
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
  date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
)


puts "✅ Done seeding!"