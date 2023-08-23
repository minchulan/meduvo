class UserAppointmentSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :category, :name, :location, :description, :date, :patient

  def patient 
    {
      name: self.object.patient.full_name,
      dob: self.object.patient.dob.strftime('%m/%d/%Y'),
    }
  end 

  def date 
    self.object.date.strftime('%m-%d-%Y')
  end 
end

# to invoke methods, must add to the list of attributes in line 2. 
