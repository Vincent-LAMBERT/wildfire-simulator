package eu.vincent_lambert.test_java.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForestState {
    private Trees firedUpTrees = new Trees();
    private Trees DeadTrees = new Trees();

    @Data
    public static class TreeCoordinates {
        private final int x;
        private final int y;
    }

    @Data
    public static class Trees implements Iterable<TreeCoordinates> {
        // Using a HashMap makes it more efficient to check if a tree is already in the list, 
        // which is important for the fire propagation logic. Saves time while staying clear
        private final Map<Integer, ArrayList<Integer>> hashmap = new HashMap<Integer, ArrayList<Integer>>();

        public void add(TreeCoordinates tree) {
            this.hashmap.computeIfAbsent(tree.getX(), k -> new ArrayList<Integer>()).add(tree.getY());
        }

        public void append(Trees trees) {
            for (TreeCoordinates tree : trees) {
                this.add(tree);
            }
        }

        @Override
        public Iterator<TreeCoordinates> iterator() {
            // Transform the map into an iterator
            ArrayList<TreeCoordinates> treeCoordinatesList = new ArrayList<TreeCoordinates>();
            for (Map.Entry<Integer, ArrayList<Integer>> entry : this.hashmap.entrySet()) {
                int x = entry.getKey();
                for (Integer y : entry.getValue()) {
                    treeCoordinatesList.add(new TreeCoordinates(x, y)); 
                }
            }
            return treeCoordinatesList.iterator();
        }

        public Boolean contains(TreeCoordinates tree) {
            return this.hashmap.containsKey(tree.getX()) && this.hashmap.get(tree.getX()).contains(tree.getY());
        }
    }
}