class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin

  has_many :appointments, serializer: UserAppointmentSerializer
end