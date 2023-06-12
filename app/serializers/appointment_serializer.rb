class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :patient_id, :type, :name, :location, :description 
end
          