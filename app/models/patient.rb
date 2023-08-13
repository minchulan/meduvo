class Patient < ApplicationRecord
    # belongs_to :user 
    has_many :appointments, dependent: :destroy 
    has_many :users, through: :appointments
    # has_many :pharmacists, through: :appointments, source: :user 

    validates :first_name, :last_name, :dob, :allergies, :phone, :email, presence: true

    validates_associated :appointments

    # validates :viewed_notice_of_privacy_practices, acceptance: true 

    def full_name
        "#{first_name} #{last_name}"
    end 

    scope :sort_desc_by_name, -> { order(name: :desc) }

end 




#----------------------------------

    # validates :first_name, :last_name, :dob, :allergies, :phone, :email, presence: true

    # # Run the validations when creating a patient
    # validates :first_name, :last_name, :dob, :allergies, :phone, :email, presence: true, on: :create

    # # Run the validations when updating a patient
    # validates :first_name, :last_name, :dob, :allergies, :phone, :email, presence: true, on: :update


# has_many :appointments: This line establishes the direct association between Patient and Appointment. A patient can have multiple appointments.
# By using the full_name method, you can conveniently display the full name attribute without modifying the existing first_name and last_name attributes.

# has_many :pharmacists, through: :appointments, source: :user: This line defines a second association :doctors on the Patient model. The through: :appointments option specifies that the association should be resolved through the appointments association. The source: :user option specifies that the records for the :doctors association should be fetched using the :user association on the Appointment model.
# So, when you call patient.pharmacists, Rails knows to go through the appointments table, retrieve the associated user records, and provide you with a collection of pharmacists associated with that patient.
# the source option is telling Rails which association to follow on the intermediate model (Appointment in this case) to retrieve the desired records for the :pharmacists association on the Patient model.
