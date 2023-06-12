require 'faker'

puts "Seeding data...."

# Clear existing data
Appointment.destroy_all
Patient.destroy_all
User.destroy_all

# Create admin user
admin = User.create(
  username: 'admin',
  email: 'admin@example.com',
  password: 'password',
  admin: true
)

# Create regular users
5.times do
  User.create(
    username: Faker::Internet.unique.username(specifier: 4..25),
    email: Faker::Internet.unique.email,
    password: 'password'
  )
end

# Create patients
10.times do
  Patient.create(
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
end

# Create appointments
users = User.all
patients = Patient.all

20.times do
  Appointment.create(
    user: users.sample,
    patient: patients.sample,
    type: ['immunization', 'mtm', 'msc'].sample,
    name: Faker::Lorem.words(number: rand(2..4)).join(' '),
    location: Faker::Address.full_address,
    description: Faker::Lorem.paragraph(sentence_count: rand(2..6))
  )
end

puts 'Seeding completed!'


puts "✅ Done seeding!"