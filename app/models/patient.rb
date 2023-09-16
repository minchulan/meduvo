class Patient < ApplicationRecord
    has_many :appointments, dependent: :destroy 
    has_many :users, through: :appointments

    validates_presence_of :first_name, :last_name, :dob, :allergies, :phone, :email

    def full_name
        "#{first_name} #{last_name}"
    end 
end 


## SCOPE
# In Rails, scopes are a way to define a set of common queries that you can reuse across multiple parts of your application. Scopes are typically defined within your model classes and allow you to encapsulate specific query conditions. They help keep your code DRY (Don't Repeat Yourself) and make your queries more readable.

# I.e. 1, 
    # scope :long_addresses, -> { where("LENGTH(address) > 20") } #allows you to give a specific query a name to reuse in controller.

    # scope :admin, -> { where(admin: true) } # this example defines a scope named `admin` that uses the `where` method to filter products where the `admin` attribute is true. 

    # Retrieve all admin users
    # @admin_users = User.admin

# I.e. 2,

    # scope :long_titles, -> (n = 30) { where("LENGTH(title) > ?", n) } 


