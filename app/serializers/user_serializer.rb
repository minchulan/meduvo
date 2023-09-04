class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin

  has_many :appointments, serializer: UserAppointmentsSerializer
  # has_many :patients 
end

# don't send password to frontend. we don't want to send our hashed password to frontend. it's bad practice.

# we sent user info back and forth through sessions. 

# has_many :patients association is commented out bc we don't need additional patients data. Serialized UserAppointmentSerializer to include patient's name & DOB only to the appointments. 
