# == Schema Information
#
# Table name: appointments
#
#  id          :bigint           not null, primary key
#  category    :string
#  description :text
#  location    :string
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  patient_id  :integer
#  user_id     :integer
#
require 'rails_helper'

RSpec.describe Appointment, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
