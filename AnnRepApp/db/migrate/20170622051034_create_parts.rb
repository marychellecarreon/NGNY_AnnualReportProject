class CreateParts < ActiveRecord::Migration[5.0]
  def change
    create_table :parts do |t|
      t.string :title
      t.references :report, foreign_key: true

      t.timestamps
    end
  end
end
