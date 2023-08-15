class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :category, :name, :location, :description, :date 
  
  belongs_to :user
  belongs_to :patient
end