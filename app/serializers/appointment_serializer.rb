# == Schema Information
#
# Table name: appointments
#
#  id          :bigint           not null, primary key
#  category    :string
#  date        :date
#  description :text
#  location    :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  patient_id  :integer
#  user_id     :integer
#
class AppointmentSerializer < ActiveModel::Serializer
  attributes :id, :patient_id, :category, :name, :location, :description, :date 
  
  belongs_to :user
  belongs_to :patient

  def date 
    self.object.date.strftime('%m-%d-%Y')
  end 

end
