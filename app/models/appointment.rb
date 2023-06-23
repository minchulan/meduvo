class Appointment < ApplicationRecord
    belongs_to :user 
    belongs_to :patient 

    validates :category, presence: true 
    validates :name, presence: true 
    validates :description, length: {in: (10..500)}

    before_save :format_name 

    scope :sort_desc_by_name, -> {self.order(name: :desc)}

    def format_name
        if self.name[0] != self.name[0].upcase 
            self.name = self.name.capitalize 
        end 
    end 
end


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
