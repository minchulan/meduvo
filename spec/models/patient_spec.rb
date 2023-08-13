# == Schema Information
#
# Table name: patients
#
#  id                                 :bigint           not null, primary key
#  address                            :string
#  allergies                          :string
#  dob                                :date
#  email                              :string
#  first_name                         :string
#  gender                             :string
#  guardian                           :string
#  language_preferences               :string
#  last_name                          :string
#  notes                              :text
#  phone                              :string
#  viewed_notice_of_privacy_practices :string
#  created_at                         :datetime         not null
#  updated_at                         :datetime         not null
#
require 'rails_helper'

RSpec.describe Patient, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
