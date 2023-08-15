class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :admin

  has_many :appointments
  has_many :patients
end