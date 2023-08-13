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
patients = []
10.times do
  patients << Patient.create(
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
end

# Create appointments
[patients[0], patients[1], patients[2]].each do |patient|
  3.times do
    Appointment.create(
      user_id: u1.id,
      patient_id: patient.id,
      name: Faker::Lorem.words(number: rand(2..4)).join(' '),
      category: ['immunization', 'mtm', 'msc'].sample,
      location: Faker::Address.full_address,
      description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
      date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
    )
  end
end

[patients[3], patients[4], patients[5]].each do |patient|
  2.times do
    Appointment.create(
      user_id: u2.id,
      patient_id: patient.id,
      name: Faker::Lorem.words(number: rand(2..4)).join(' '),
      category: ['immunization', 'mtm', 'msc'].sample,
      location: Faker::Address.full_address,
      description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
      date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
    )
  end
end

patients[6..9].each do |patient|
  Appointment.create(
    user_id: admin.id,
    patient_id: patient.id,
    name: Faker::Lorem.words(number: rand(2..4)).join(' '),
    category: ['immunization', 'mtm', 'msc'].sample,
    location: Faker::Address.full_address,
    description: Faker::Lorem.paragraph(sentence_count: rand(2..6)),
    date: Faker::Time.between(from: DateTime.now - 30.days, to: DateTime.now + 30.days)
  )
end

puts "✅ Done seeding!"

