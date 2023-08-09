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
    # ... (patient attributes)
  )
end

# Create appointments
[patients[0], patients[1], patients[2]].each do |patient|
  # ... (appointment creation for u1)
end

[patients[3], patients[4], patients[5]].each do |patient|
  # ... (appointment creation for u2)
end

patients[6..9].each do |patient|
  # ... (appointment creation for admin)
end

# Delete appointments
Appointment.delete_all

# Delete patients
Patient.delete_all

puts "✅ Done seeding!"

