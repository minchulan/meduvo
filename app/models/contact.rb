# == Schema Information
#
# Table name: contacts
#
#  id         :bigint           not null, primary key
#  address    :text
#  dob        :date
#  email      :string
#  first_name :string
#  last_name  :string
#  notes      :text
#  phone      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Contact < ApplicationRecord
end
