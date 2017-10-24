class ChangeHeaderColourTypeInReport < ActiveRecord::Migration[5.0]
  def change
    change_column :reports, :header_colour, :string
  end
end
