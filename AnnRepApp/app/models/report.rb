class Report < ApplicationRecord
  has_many :parts
  belongs_to :user
end
