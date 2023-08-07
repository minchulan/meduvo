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
class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :patient

  with_options if: :validate_appointment? do |appointment|
    appointment.validates :category, :name, :location, :date, presence: true
    appointment.validates :description, length: { in: 5..500 }
    appointment.validates :name, length: { minimum: 2, maximum: 50 }
  end

  scope :sort_desc_by_name, -> { order(name: :desc) }

  private

  def validate_appointment?
    !new_record?
  end 
end




# --------------------
# In this example, we're using the with_options block to define validations that should only be triggered if the validate_appointment? method returns true. The validate_appointment? method returns false when creating a new patient (new_record? returns true for a new record). By using this approach, the appointment validations will be applied when saving appointments as usual, but they will be skipped when creating new patients. This allows you to control when certain validations should be applied based on the context of the operation.

# Let's go through the code line by line:

# I've moved the should_format_name? method to improve readability. It helps clarify whether the name should be formatted or not.
# I've encapsulated the should_format_name? method within the private section, since it's an internal logic detail.
# The before_save callback now directly calls should_format_name? to determine whether the name should be formatted.
# The logic remains unchanged; this version is simply organized and named in a way that might make the code's intent clearer.

# ```ruby
# class Appointment < ApplicationRecord
# ```
# - This line defines a new class named `Appointment` that inherits from `ApplicationRecord`. It signifies that `Appointment` is an ActiveRecord model.

# ```ruby
#   belongs_to :user 
#   belongs_to :patient 
# ```
# - These lines establish associations between the `Appointment` model and the `User` and `Patient` models. It indicates that an appointment belongs to a user and a patient.

# ```ruby
#   validates :category, :name, presence: true 
# ```
# - These lines define validations for the `category` and `name` attributes. They ensure that both `category` and `name` must be present (not blank) for an appointment to be considered valid.

# ```ruby
#   validates :description, length: { in: 10..500 }
# ```
# - This line sets a validation for the `description` attribute. It checks that the length of the description is within the range of 10 to 500 characters.

# ```ruby
#   validates :category, inclusion: { in: %w[category1 category2 category3] }
# ```
# - This line validates that the `category` attribute can only have values that are included in the provided array (`category1`, `category2`, or `category3`).

# ```ruby
#   validates :name, length: { minimum: 2, maximum: 50 }
# ```
# - This line sets a validation for the `name` attribute. It specifies that the length of the name should be between 2 and 50 characters.

# ```ruby
#   before_save :format_name 
# ```
# - This line sets a callback to be executed before saving an appointment. It invokes the `format_name` method.

# ```ruby
#   scope :sort_desc_by_name, -> { order(name: :desc) }
# ```
# - This line defines a scope named `sort_desc_by_name` for the `Appointment` model. It sorts appointments in descending order based on the `name` attribute.

# ```ruby
#   def format_name
#     self.name = name.capitalize if name.present? && name[0] != name[0].upcase 
#   end 
# ```
# - This is a custom method defined within the `Appointment` model. It formats the `name` attribute by capitalizing the first letter if it's not already capitalized. It is called before saving an appointment.

# --------------------------------

# By combining the presence validations for category and name, you avoid repeating the presence: true validation. Additionally, the format validation is moved to a separate method format_name, which is called in the before_save callback. This makes the code more modular and DRY.

# A scope in Rails allows you to define a specific subset of records in your model based on certain conditions. Scopes are used to encapsulate commonly used queries, making them reusable and providing a clean and readable way to define query conditions.

# Scopes are defined using the scope class method in your model. They allow you to define a set of conditions that can be chained with other query methods like where, order, limit, etc.

# i.e., 
# class User < ApplicationRecord
#   scope :active, -> { where(active: true) }
# end

# In this example, the active scope is defined to retrieve only active users. It can be used as User.active to fetch all active users from the database.

# Scopes can be chained together and combined with other query methods to create more complex queries.

# You can use before_save to modify attributes, perform calculations, or any other necessary logic before persisting the record to the database.

# I.e.,
# class User < ApplicationRecord
#   before_save :capitalize_name

#   def capitalize_name
#     self.name = name.capitalize
#   end
# end

# In this example, the before_save callback is used to automatically capitalize the name attribute before saving the user record to the database. The capitalize_name method is called before the save operation, modifying the name attribute.

# You can have multiple before_save callbacks in a model, and they will be executed in the order they are defined.

# Both scope and before_save are powerful features in Rails that allow you to define query conditions and perform actions on models, respectively. They help in organizing and encapsulating logic within the model layer of your Rails application.
