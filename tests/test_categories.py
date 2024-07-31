import unittest
from categories import Category


class TestCategories(unittest.TestCase):
    def test_calculate_total_single_category(self):
        a = Category("a")
        a.add_transaction(10)

        self.assertEqual(a.calculate_total(), 10)

    def test_calculate_total_hierarchy(self):
        a = Category("a", [Category("a.b", [Category("a.b.c")]), Category("a.d")])
        a.add_transaction(2)
        a.add_transaction(3, "a.b")
        a.add_transaction(5, "a.b.c")
        a.add_transaction(7, "a.d")

        self.assertEqual(a.calculate_total(), 2 + 3 + 5 + 7)
        self.assertEqual(a.find_by_name("a.b").calculate_total(), 3 + 5)
        self.assertEqual(a.find_by_name("a.b.c").calculate_total(), 5)
        self.assertEqual(a.find_by_name("a.d").calculate_total(), 7)
