require 'faker'

puts "Seeding data...."

# Clear existing data
Appointment.destroy_all
User.destroy_all
Patient.destroy_all

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
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean
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
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean
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
  viewed_notice_of_privacy_practices: Faker::Boolean.boolean
)

# Create users
u1 = User.create(username: "minchulan", email: "itsminchul@gmail.com", password: "password123", admin: false)
u2 = User.create(username: "guest", email: "email@gmail.com", password: "password123", admin: false)
admin = User.create(
  username: 'admin',
  email: 'admin@example.com',
  password: 'password',
  admin: true
)

# Create appointments
Appointment.create(
  user: u1,
  patient: p2, 
  category: ['immunization', 'mtm', 'msc'].sample,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6))
)
Appointment.create(
  user: u2,
  patient: p3, 
  category: ['immunization', 'mtm', 'msc'].sample,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6))
)
Appointment.create(
  user: admin,
  patient: p2, 
  category: ['immunization', 'mtm', 'msc'].sample,
  name: Faker::Lorem.words(number: rand(2..4)).join(' '),
  location: Faker::Address.full_address,
  description: Faker::Lorem.paragraph(sentence_count: rand(2..6))
)

puts "✅ Done seeding!"
